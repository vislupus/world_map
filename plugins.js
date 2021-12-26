Snap.plugin(function (Snap, Element, Paper, global) {
    Element.prototype.getCursorPoint = function (x, y) {
        var pt = this.paper.node.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(this.paper.node.getScreenCTM().inverse());
    }

    Element.prototype.getCenter = function () {
        let bbox = this.getBBox();
        return {
            x: bbox.cx,
            y: bbox.cy
        }
    }

    Element.prototype.show = function () {
        this.attr('display', '');
    };

    Element.prototype.hide = function () {
        this.attr('display', 'none');
    }
});
