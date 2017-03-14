namespace engine {
    export let run = (canvas: HTMLCanvasElement) => {

        var stage = new DisplayObjectContainer();
        let context2D = canvas.getContext("2d");
        let lastNow = Date.now();
        let frameHandler = () => {
            let now = Date.now();
            let deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            context2D.save();
            stage.draw(context2D);
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        }

        window.requestAnimationFrame(frameHandler);

        let hitResult: DisplayObject;
        let currentX: number;
        let currentY: number;
        let lastX: number;
        let lastY: number;
        let isMouseDown = false;

        window.onmousedown = (e) => {
            isMouseDown = true;
            let targetArray = EventManager.getInstance().targetArray;
            targetArray.splice(0, targetArray.length);
            hitResult = stage.hitTest(e.offsetX, e.offsetY);
            currentX = e.offsetX;
            currentY = e.offsetY;
        }

        window.onmousemove = (e) => {
            let targetArray = EventManager.getInstance().targetArray;
            lastX = currentX;
            lastY = currentY;
            currentX = e.offsetX;
            currentY = e.offsetY;
            if (isMouseDown) {
                for (let i = 0; i < targetArray.length; i++) {
                    for (let x of targetArray[i].eventArray) {
                        if (x.eventType.match("onmousemove") &&
                            x.ifCapture == true) {
                            x.func(e);
                        }
                    }
                }
                for (let i = targetArray.length - 1; i >= 0; i--) {
                    for (let x of targetArray[i].eventArray) {
                        if (x.eventType.match("onmousemove") &&
                            x.ifCapture == false) {
                            x.func(e);
                        }
                    }
                }
            }
        }
        window.onmouseup = (e) => {
            isMouseDown = false;
            let targetArray = EventManager.getInstance().targetArray;
            targetArray.splice(0, targetArray.length);
            let newHitRusult = stage.hitTest(e.offsetX, e.offsetY);
            for (let i = 0; i < targetArray.length; i++) {
                    for (let x of targetArray[i].eventArray) {
                        if (x.eventType.match("onclick") &&
                            newHitRusult == hitResult &&
                            x.ifCapture == true) {
                            x.func(e);
                        }
                    }
            }
            for (let i = targetArray.length - 1; i >= 0; i--) {
                    for (let x of targetArray[i].eventArray) {
                        if (x.eventType.match("onclick") &&
                            newHitRusult == hitResult &&
                            x.ifCapture == false) {
                            x.func(e,);
                        }
                    }
            }
        }
        return stage;

    }



}
