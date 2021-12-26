var width = 848;
var height = 480;

var s = new Snap("#svg").attr({
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: 'xMaxYMax',
    width: width,
    height: height
});

function loadSVG(url) {
    return new Promise(function (resolve, reject) {
        Snap.load(url, resolve);
    });
};

(async function () {
    await loadSVG('shutterstock_723379432_mod.svg').then(function (svg) {
        s.append(svg);
    });

    var rect = s.rect(0, 0, 0, 0, 5).attr({
        fill: 'white',
        stroke: '#814D2B',
        'stroke-width': '0.5',
    });

    let text = s.text(0, 0, "Country: ").attr({
        "font-family": "sans-serif",
        "font-size": 12,
        "fill": "#4a301c",
        "text-anchor": "start"
    });

    let textVal = s.text(0, 0, "").attr({
        "font-family": "sans-serif",
        "font-size": 12,
        "fill": "#4a301c",
        "text-anchor": "start",
        "font-weight": "bold"
    });

    let setText = Snap.set(text, textVal);
    let setBox = Snap.set(rect, setText);
    setBox.attr({
        display: 'none'
    });


    var countries = s.select("#countries")
    var getColor;

    var preTextWidth;
    var preTextHeight;

    countries.hover(function (e) {
        getColor = document.getElementById(e.target.id).getAttribute("fill")

        let country = s.select(`#${e.target.id}`)
        country.attr({
            fill: "#a56c46"
        });

        setBox.attr({
            display: ''
        });

        s.mousemove(function (event, x, y) {
            let cpt = s.getCursorPoint(x, y);

            let textWidth;
            let textHeight;
            let textBB = setBox[1].getBBox()

            if (cpt.x > 707) {
                textVal.attr({
                    text: `${e.target.id.replaceAll("_"," ")}`
                });

                textBB = setBox[1].getBBox()
                textWidth = textBB.width;
                textHeight = textBB.height;

                if (textBB.width !== 0) {
                    preTextWidth = textWidth;
                    preTextHeight = textHeight;
                } else {
                    textWidth = preTextWidth;
                    textHeight = preTextHeight;
                }

                rect.attr({
                    x: (cpt.x - textBB.width) - 20,
                    y: cpt.y,
                    width: textWidth + 10,
                    height: textHeight + 10
                });

                text.attr({
                    x: (cpt.x - textBB.width) - 15,
                    y: cpt.y + 16
                });

                textVal.attr({
                    x: (cpt.x - textBB.width) + 33,
                    y: cpt.y + 16
                });
            } else {
                text.attr({
                    x: cpt.x + 20,
                    y: cpt.y + 16
                });

                textVal.attr({
                    text: `${e.target.id.replaceAll("_"," ")}`,
                    x: cpt.x + 67.5,
                    y: cpt.y + 16
                });

                textBB = setBox[1].getBBox()
                textWidth = textBB.width;
                textHeight = textBB.height;

                if (textBB.width !== 0) {
                    preTextWidth = textWidth;
                    preTextHeight = textHeight;
                } else {
                    textWidth = preTextWidth;
                    textHeight = preTextHeight;
                }

                rect.attr({
                    x: cpt.x + 15,
                    y: cpt.y,
                    width: textWidth + 10,
                    height: textHeight + 10
                });
            }
        });
    }, function (e) {
        let country = s.select(`#${e.target.id}`)
        country.attr({
            fill: getColor
        });

        setBox.attr({
            display: 'none'
        });
    });



    let sliderStart = 124;
    let sliderWidth = 600;
    let sliderTop = 441;
    let sliderHeight = 14;
    let sliderThumbRadius = sliderHeight / 2;
    let sliderStop = sliderStart + sliderWidth;
    let sliderMin = 2014;
    let sliderMax = data[data.length - 1].year;
    let sliderCount = sliderMax - sliderMin;
    let sliderStep = sliderWidth / sliderCount;
    let sliderThumbStart = sliderStart + sliderThumbRadius;
    let sliderThumbStop = sliderStop - sliderThumbRadius;

    let arrAll = [];
    for (let j = 0; j < data.length; j++) {
        arrAll = arrAll.concat(data[j].countries)
    }

    function get_countries(year) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].year === year) {
                let arr = [];
                for (let j = 0; j < i + 1; j++) {
                    arr = arr.concat(data[j].countries)
                }

                return arr;
            }
        }
    }


    var sliderBody = s.rect(sliderStart, sliderTop, sliderWidth, sliderHeight, 7).attr({
        fill: '#ffeccf',
        stroke: '#814D2B',
        'stroke-width': '1',
    });

    var sliderThumb = s.circle(sliderStart + sliderThumbRadius, sliderTop + sliderThumbRadius, sliderThumbRadius).attr({
        fill: '#814D2B',
        opacity: 1,
        id: 'slider_thumb'
    });

    var sliderText = s.text(sliderStart - 10, sliderTop - 4, sliderMin).attr({
        "font-family": "sans-serif",
        "font-size": 13,
        "fill": "#4a301c",
        "font-weight": "bold"
    });

    let textWidth = sliderText.getBBox().width;
    sliderText.attr({
        x: sliderThumbStart - textWidth / 2
    });

    s.select(`#Bulgaria`).attr({
        fill: "#d4a377"
    });


    //    for (let i = 1; i < sliderCount; i++) {
    //        s.line(i * sliderStep + sliderStart, 433, i * sliderStep + sliderStart, 455).attr({
    //            stroke: "black",
    //            strokeWidth: 1
    //        });
    //
    //        s.text(i * sliderStep + sliderStart - 10, 430, i * sliderStep + sliderStart).attr({
    //            "font-family": "sans-serif",
    //            "font-size": 12,
    //            "fill": "black"
    //        });
    //    }


    sliderThumb.drag(function (dx, dy, x, y) {
        let cpt = s.getCursorPoint(x, y);
        let pos = cpt.x;

        //((n-start1)/(stop1-start1))*(stop2-start2)+start2
        //        value = (cpt.x - sliderThumbStart) / (sliderThumbStop - sliderThumbStart) * (sliderMax - sliderMin) + sliderMin;

        //        console.log(((value - sliderMin) / (sliderMax - sliderMin) * 100).toFixed(2) + "%")

        if (pos < sliderThumbStart) {
            pos = sliderThumbStart;
        } else if (pos > sliderThumbStop) {
            pos = sliderThumbStop;
        }

        let step = Math.round((pos - sliderThumbStart) / sliderStep);
        let year = step + sliderMin;
        let sliderBond = sliderStart;

        if (step === 0) {
            sliderBond = sliderStart + sliderThumbRadius;
        } else if (step === sliderCount) {
            sliderBond = sliderStart - sliderThumbRadius;
        }

        sliderThumb.attr({
            cx: step * sliderStep + sliderBond
        });

        sliderText.attr({
            text: year,
            x: (step * sliderStep + sliderBond) - textWidth / 2
        });



        let arrCountries = get_countries(year);

        for (country of arrAll) {
            let countryColor = s.select(`#${country}`)
            countryColor.attr({
                fill: "#ffeccf"
            });
        }

        for (country of arrCountries) {
            let countryColor = s.select(`#${country}`)
            countryColor.attr({
                fill: "#d4a377"
            });
        }
    });



    sliderThumb.touchmove(function (event) {
        let posX = event.changedTouches[0].clientX;
        let posY = event.changedTouches[0].clientY;

        let cpt = s.getCursorPoint(posX, posY);
        let pos = cpt.x;

        if (pos < sliderThumbStart) {
            pos = sliderThumbStart;
        } else if (pos > sliderThumbStop) {
            pos = sliderThumbStop;
        }

        let step = Math.round((pos - sliderThumbStart) / sliderStep);
        let year = step + sliderMin;
        let sliderBond = sliderStart;

        if (step === 0) {
            sliderBond = sliderStart + sliderThumbRadius;
        } else if (step === sliderCount) {
            sliderBond = sliderStart - sliderThumbRadius;
        }

        sliderThumb.attr({
            cx: step * sliderStep + sliderBond
        });

        sliderText.attr({
            text: year,
            x: (step * sliderStep + sliderBond) - textWidth / 2
        });



        let arrCountries = get_countries(year);

        for (country of arrAll) {
            let countryColor = s.select(`#${country}`)
            countryColor.attr({
                fill: "#ffeccf"
            });
        }

        for (country of arrCountries) {
            let countryColor = s.select(`#${country}`)
            countryColor.attr({
                fill: "#d4a377"
            });
        }
    });
})();
