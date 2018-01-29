var DamasClasico = {

    init: function () {
        $('img.dama-azul, img.dama-roja').draggable({
            disabled: true,
            move: "move",
            containment: "#board",
            snap: ".dama",
            snapMode: "inner",
            snapTolerance: 40,
            revert: true,
            revertDuration: 200
        });

        $('img.dama-azul').draggable('enable');

        $('.signed.white').droppable({
            accept: ".dama-azul, .dama-roja",
            drop: function (event, ui) {

                if ($(this).children().length === 0) {
                    var idCasilla = $(this).attr("id");
                    var idCasillaFigura = $(ui.draggable).parent().attr("id");

                    var cambioHorizontal = parseInt(idCasilla.substring(2)) - parseInt(idCasillaFigura.substring(2));

                    var cambioVertical = parseInt(idCasilla.substring(1, 2)) - parseInt(idCasillaFigura.substring(1, 2));

                    var cS;
                    var cT;
                    var r;

                    if ($(ui.draggable).hasClass("dama-azul")) {
                        if (cambioHorizontal === 1 && Math.abs(cambioVertical) === 1) {
                            $(this).append(ui.draggable);
                            $('img.dama-azul').draggable('disable');
                            $('img.dama-roja').draggable('enable');
                        } else if (cambioHorizontal > 0) {
                            cS = parseInt(idCasillaFigura.substring(1, 2));
                            cT = parseInt(idCasilla.substring(1, 2));
                            r = parseInt(idCasillaFigura.substring(2));

                            if (DamasClasico.puedeRealizarMovimientoAzules(cS, cT, r)) {
                                $(this).append(ui.draggable);
                                $('img.dama-azul').draggable('disable');
                                $('img.dama-roja').draggable('enable');
                            }
                        }
                    } else if ($(ui.draggable).hasClass("dama-roja")) {
                        if (cambioHorizontal === -1 && Math.abs(cambioVertical) === 1) {
                            $(this).append(ui.draggable);
                            $('img.dama-azul').draggable('enable');
                            $('img.dama-roja').draggable('disable');
                        } else if (cambioHorizontal < 0) {

                            cS = parseInt(idCasillaFigura.substring(1, 2));
                            cT = parseInt(idCasilla.substring(1, 2));
                            r = parseInt(idCasillaFigura.substring(2));

                            if (DamasClasico.puedeRealizarMovimientoRojas(cS, cT, r)) {
                                $(this).append(ui.draggable);
                                $('img.dama-azul').draggable('enable');
                                $('img.dama-roja').draggable('disable');
                            }
                        }
                    }
                }
            }
        });
    },
    puedeRealizarMovimientoAzules: function (cS, cT, r) {

        var k = 0;
        var countCasillasVacias = 0;
        var casillaActual;

        var fichasComidas = [];

        if (cT < cS) {
            k = cS - 1;

            while (k > cT) {
                ++r;

                casillaActual = $("#i" + k + r);

                console.log(casillaActual);

                if ($(casillaActual).children().length === 0) {
                    ++countCasillasVacias;

                    if (countCasillasVacias === 2) {
                        return false;
                    }
                } else {
                    if ($($(casillaActual).children()[0]).hasClass("dama-azul")) {
                        return false;
                    } else {
                        fichasComidas.push($(casillaActual).children()[0]);
                        countCasillasVacias = 0;
                    }
                }

                --k;
            }
        } else {
            k = cS + 1;

            while (k < cT) {

                ++r;

                casillaActual = $("#i" + k + r);

                if ($(casillaActual).children().length === 0) {
                    ++countCasillasVacias;

                    if (countCasillasVacias === 2) {
                        return false;
                    }
                } else {
                    if ($($(casillaActual).children()[0]).hasClass("dama-azul")) {
                        return false;
                    } else {
                        fichasComidas.push($(casillaActual).children()[0]);
                        countCasillasVacias = 0;
                    }
                }

                ++k;
            }
        }

        if (countCasillasVacias === 1) {
            return false;
        } else {
            fichasComidas.forEach(function (t) {
                $('#fichasAzules').append(t);
            });
            return true;
        }
    },
    puedeRealizarMovimientoRojas: function (cS, cT, r) {
        var k = 0;
        var countCasillasVacias = 0;
        var casillaActual;

        var fichasComidas = [];

        if (cT < cS) {
            k = cS - 1;

            while (k > cT) {
                --r;

                casillaActual = $("#i" + k + r);

                console.log(casillaActual);

                if ($(casillaActual).children().length === 0) {
                    ++countCasillasVacias;

                    if (countCasillasVacias === 2) {
                        return false;
                    }
                } else {
                    if ($($(casillaActual).children()[0]).hasClass("dama-roja")) {
                        return false;
                    } else {
                        fichasComidas.push($(casillaActual).children()[0]);
                        countCasillasVacias = 0;
                    }
                }

                --k;
            }
        } else {
            k = cS + 1;

            while (k < cT) {

                --r;

                casillaActual = $("#i" + k + r);

                if ($(casillaActual).children().length === 0) {
                    ++countCasillasVacias;

                    if (countCasillasVacias === 2) {
                        return false;
                    }
                } else {
                    if ($($(casillaActual).children()[0]).hasClass("dama-roja")) {
                        return false;
                    } else {
                        fichasComidas.push($(casillaActual).children()[0]);
                        countCasillasVacias = 0;
                    }
                }

                ++k;
            }
        }

        if (countCasillasVacias === 1) {
            return false;
        } else {
            fichasComidas.forEach(function (t) {
                $('#fichasRojas').append(t);
            });
            return true;
        }
    }
};

DamasClasico.init();
