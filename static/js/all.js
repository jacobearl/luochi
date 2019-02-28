
var addEvent = function(elt, evt, f) {
    if (!!elt.addEventListener)
        elt.addEventListener(evt, f, false);
    else
        elt.attachEvent('on' + evt, f);
};
var getAngleMeasure = function(angle) {
    return angle - Math.floor(angle / (2.0 * Math.PI)) * 2.0 * Math.PI;
};
var stayBetween = function(x, min, max) {
    return Math.max(min, Math.min(max, x));
};

var All = function(args){
    var _this = this, root, canvas_container, renderer = null, scene = null, camera = null, stereo_effect = null;
    var mousedown = false, mouse_x = 0, mouse_y = 0, autorotate_timeout;
    var container = args.container, 
        panorama = args.panorama,
        viewer_size = args.size;

    var PSV_LONG_OFFSET = (args.long_offset !== undefined) ? parseFloat(args.long_offset) : Math.PI / 360.0;
    var PSV_LAT_OFFSET = (args.lat_offset !== undefined) ? parseFloat(args.lat_offset) : Math.PI / 180.0;

    var PSV_FOV_MIN = (args.min_fov !== undefined) ? stayBetween(parseFloat(args.min_fov), 1, 179) : 30;
    var PSV_FOV_MAX = (args.max_fov !== undefined) ? stayBetween(parseFloat(args.max_fov), 1, 179) : 90;

    var PSV_TILT_UP_MAX = (args.tilt_up_max !== undefined) ? stayBetween(parseAngle(args.tilt_up_max), 0, Math.PI / 2.0) : Math.PI / 2.0;
    var PSV_TILT_DOWN_MAX = (args.tilt_down_max !== undefined) ? -stayBetween(parseAngle(args.tilt_down_max), 0, Math.PI / 2.0) : -Math.PI / 2.0;
    

    var lat = 0, long = 0;

    var isCanvasSupported = function() {
        var canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
    };
    var isWebGLSupported = function() {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    };

    this.render = function() {
        var point = new THREE.Vector3();
        point.setX(Math.cos(lat) * Math.sin(long));
        point.setY(Math.sin(lat));
        point.setZ(Math.cos(lat) * Math.cos(long));

        camera.lookAt(point);

        renderer.render(scene, camera);
    };
    this.createScene = function(texture) {

        _this.fitToContainer();

        renderer = (isWebGLSupported()) ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
        renderer.setSize(viewer_size.width, viewer_size.height);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(90, viewer_size.ratio, 1, 300);
        camera.position.set(0, 0, 0);
        scene.add(camera);

        var geometry = new THREE.SphereGeometry(200, 32, 32);
        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.x = -1;
        scene.add(mesh);

        canvas_container = document.createElement('div');
        canvas_container.style.position = 'absolute';
        canvas_container.style.zIndex = 0;
        root.appendChild(canvas_container);

        addEvent(window, 'resize', _this.fitToContainer);
        addEvent(canvas_container, 'mousedown', _this.onMouseDown);
        addEvent(document, 'mousemove', _this.onMouseMove);
        addEvent(document, 'mouseup', _this.onMouseUp);
        addEvent(canvas_container, 'touchstart', _this.onTouchStart);
        addEvent(document, 'touchend', _this.onMouseUp);
        addEvent(document, 'touchmove', _this.onTouchMove);

        addEvent(canvas_container, 'mousewheel', _this.onMouseWheel);
        addEvent(canvas_container, 'DOMMouseScroll', _this.onMouseWheel);

        container.innerHTML = '';
        container.appendChild(root);

        var canvas = renderer.domElement;
        canvas.style.display = 'block';

        canvas_container.appendChild(canvas);
        _this.render();

        console.log("加载完成！！！！！！");
        _this.autorotate();
    };
    this.loadTexture = function(path) {
        var texture = new THREE.Texture();
        var loader = new THREE.ImageLoader();

        var onLoad = function(img) {
            texture.needsUpdate = true;
            texture.image = img;

            _this.createScene(texture);
        }

        loader.load(path, onLoad);
    };
    this.createBuffer = function(){
        var img = new Image();

        img.onload = function() {
            var pano_data = {
                full_width: img.width,
                full_height: img.height,
                cropped_width: img.width,
                cropped_height: img.height,
                cropped_x: 0,
                cropped_y: 0,
            };

            var max_width = 2048;
            if (isWebGLSupported()) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('webgl');
                max_width = ctx.getParameter(ctx.MAX_TEXTURE_SIZE);
            }

            var new_width = Math.min(pano_data.full_width, max_width);
            var r = new_width / pano_data.full_width;

            pano_data.full_width = new_width;
            pano_data.cropped_width *= r;
            pano_data.cropped_x *= r;
            img.width = pano_data.cropped_width;

            pano_data.full_height *= r;
            pano_data.cropped_height *= r;
            pano_data.cropped_y *= r;
            img.height = pano_data.cropped_height;

            var buffer = document.createElement('canvas');
            buffer.width = pano_data.full_width;
            buffer.height = pano_data.full_height;

            var ctx = buffer.getContext('2d');
            ctx.drawImage(img, pano_data.cropped_x, pano_data.cropped_y, pano_data.cropped_width, pano_data.cropped_height);

            _this.loadTexture(buffer.toDataURL('image/jpeg'));
        };

        if (!panorama.match(/^data:image\/[a-z]+;base64/))
            img.setAttribute('crossOrigin', 'anonymous');

        img.src = panorama;
    }
    this.fitToContainer = function() {
        if (container.clientWidth != viewer_size.width || container.clientHeight != viewer_size.height) {
            _this.resize({
                width: container.clientWidth,
                height: container.clientHeight
            });
        }
    };
    this.resize = function(size) {

        viewer_size.ratio = viewer_size.width / viewer_size.height;

        if (!!camera) {
            camera.aspect = viewer_size.ratio;
            camera.updateProjectionMatrix();
        }

        if (!!renderer) {
            renderer.setSize(viewer_size.width, viewer_size.height);
            _this.render();
        }

    };
    this.load = function(){

        root = document.createElement('div');
        root.style.width = '100%';
        root.style.height = '100%';
        root.style.position = 'absolute';
        root.style.overflow = 'hidden';

        container.innerHTML = '<p style="text-align:center;margin-top:50%;">加载中...<p>';
        if (!isCanvasSupported()) {
            container.textContent = '不支持Canvas';
            return;
        }
        if (window.THREE === undefined) {
            console.log('不支持three');
            return;
        }

        _this.createBuffer();
    }
    this.autorotate = function() {
        lat -= lat / 200;

        long += Math.PI / 1440;
        long -= Math.floor(long / (2.0 * Math.PI)) * 2.0 * Math.PI;

        _this.render();
        autorotate_timeout = setTimeout(_this.autorotate, 1000/60);
    };
    this.onMouseDown = function(evt) {
        _this.startMove(parseInt(evt.clientX), parseInt(evt.clientY));
    };
    this.onTouchStart = function(evt) {
        if (evt.touches.length == 1) {
            var touch = evt.touches[0];
            if (touch.target.parentNode == canvas_container)
                _this.startMove(parseInt(touch.clientX), parseInt(touch.clientY));
        }
    };
    this.onTouchMove = function(evt) {
        if (evt.touches.length == 1 && mousedown) {
            var touch = evt.touches[0];
            if (touch.target.parentNode == canvas_container) {
                evt.preventDefault();
                _this.move(parseInt(touch.clientX), parseInt(touch.clientY));
            }
        }
    };
    this.move = function(x, y) {
        if (mousedown) {
            long = getAngleMeasure(long + (x - mouse_x) * PSV_LONG_OFFSET);
            lat += (y - mouse_y) * PSV_LAT_OFFSET;
            lat = stayBetween(lat, PSV_TILT_DOWN_MAX, PSV_TILT_UP_MAX);

            mouse_x = x;
            mouse_y = y;
            _this.render();
        }
    };
    this.onMouseUp = function(evt) {
        mousedown = false;
        _this.autorotate();
    };
    this.onMouseWheel = function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var delta = (evt.detail) ? -evt.detail : evt.wheelDelta;

        if (delta != 0) {
            var direction = parseInt(delta / Math.abs(delta));
        }
    };
    this.startMove = function(x, y) {
        mouse_x = x;
        mouse_y = y;

        _this.stopAutorotate();

        mousedown = true;
    };
    _this.stopAutorotate = function() {
        clearTimeout(autorotate_timeout);
        autorotate_timeout = null;
    };

    this.load();
}


export default All



