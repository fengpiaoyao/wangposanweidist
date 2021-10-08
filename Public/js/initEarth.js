var initTree = (function (axios, XbsjEarthUI) {
    var initObj = {};
    var that = this;
    initObj.init = function () {
        initObj.tree('/Public/scene.json');

    },
        //初始化树并定位到指定位置
        initObj.tree = function (url) {
            XbsjEarthUI.create('main').then((earthUI) => {
                window.uia = earthUI;
                axios.get(url).then(res => {
                    //添加tree的所有子
                    var root;
                    if (res.data) {
                        if (res.data.sceneTree.root) {
                            root = res.data.sceneTree.root;
                        }
                        earthUI.earth.sceneTree.root = root;
                    }

                })
                //修改地球颜色
                earthUI.earth.terrainEffect.baseColor = [0, 7 / 255.0, 35 / 255.0, 1];
                //开启地下模式及深度检测
                // earthUI.earth.terrainEffect.depthTest = true;
                // earthUI.earth.czm.viewer.scene.debugShowFramesPerSecond = true;
                //飞行至初始位置
                //// 相机方向是这样的 朝北是0度，朝东是90度，朝南是180度，朝西是270度。抬头看天的俯仰角是90度，俯视地面是-90度。
                earthUI.earth.camera.flyTo([1.9667892342997917, 0.622678812750082, 435.3497202874549], 8800, [0 * Math.PI / 180, -45.09 * Math.PI / 180, 0], 6);
                initObj.showwalllist()
                initObj.addPolygon()
            });
        },
        // 添加矿区边界
        initObj.showwalllist = function () {
            initObj.dataSources2 = new Cesium.CustomDataSource(Cesium.createGuid())
            var viewer = window.uia.earth.czm.viewer;
            viewer.dataSources.add(initObj.dataSources2)
            var walllist = [{
                positions: [
                    112.666679, 35.699997, 400.000000,
                    112.715782, 35.699989, 400.000000,
                    112.705994, 35.679314, 400.000000,
                    112.729988, 35.676205, 400.000000,
                    112.729973, 35.674404, 400.000000,
                    112.734169, 35.674397, 400.000000,
                    112.734154, 35.669800, 400.000000,
                    112.725014, 35.669807, 400.000000,
                    112.725136, 35.673183, 400.000000,
                    112.714981, 35.675266, 400.000000,
                    112.712860, 35.672646, 400.000000,
                    112.703995, 35.674438, 400.000000,
                    112.703201, 35.671791, 400.000000,
                    112.692116, 35.671661, 400.000000,
                    112.692169, 35.660225, 400.000000,
                    112.656815, 35.666321, 400.000000,
                    112.643036, 35.666340, 400.000000,
                    112.658394, 35.704113, 400.000000,
                    112.666656, 35.704159, 400.000000,
                    112.666679, 35.699997, 400.000000
                ],
                prop: {
                    id: '001',
                    name: '区域1'
                },
                maxheight: 700,
                minheight: 450,
                color: Cesium.Color.fromCssColorString('#009BFF'),
            }]

            if (walllist.length > 0) {
                initObj.dataSources2.entities.removeAll()
                that.arealist = walllist
                for (var i = 0; i < walllist.length; i++) {
                    initObj.showwall(walllist[i])
                }
            }

        },
        initObj.showwall = function (opt) {
            var alp = 0.8
            var num = 0
            var maximumHeights = []
            var minimumHeights = []
            for (var i = 0; i < opt.positions.length / 3; i++) {
                maximumHeights.push(opt.maxheight)
                minimumHeights.push(opt.minheight)
            }
            var a1 = initObj.dataSources2.entities.add({
                wall: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(opt.positions),
                    maximumHeights: maximumHeights,
                    minimumHeights: minimumHeights,
                    outline: false,
                    outlineColor: Cesium.Color.BLUE,
                    // outlineWidth: 50,
                    material: new Cesium.ImageMaterialProperty({
                        image: '../../Public/img/fence.png',
                        transparent: true,
                        color: new Cesium.CallbackProperty(function () {
                            if ((num % 2) === 0) {
                                alp -= 0.015
                            } else {
                                alp += 0.015
                            }

                            if (alp <= 0.7) {
                                num++
                            } else if (alp >= 0.99) {
                                num++
                            }
                            return opt.color.withAlpha(alp)
                            // entity的颜色透明 并不影响材质，并且 entity也会透明
                        }, false)
                    })
                }
            })
            a1.prop = opt.prop
        }
    // 添加巷道底部平面，使容易进入巷道
    initObj.addPolygon = function () {
        var viewer = window.uia.earth.czm.viewer;
        var polygon = viewer.entities.add({
            id: 'emmm',
            polygon: {
                hierarchy: {
                    positions: [
                        // Cesium.Cartesian3.fromDegrees(112.5, 35.5, 400),
                        // Cesium.Cartesian3.fromDegrees(112.9, 35.5, 400),
                        // Cesium.Cartesian3.fromDegrees(112.9, 35.8, 400),
                        // Cesium.Cartesian3.fromDegrees(112.5, 35.8, 400)
                        Cesium.Cartesian3.fromDegrees(112.6376709, 35.6465879, 430),
                        Cesium.Cartesian3.fromDegrees(112.6594434, 35.7270388, 430),
                        Cesium.Cartesian3.fromDegrees(112.7489844, 35.7032992, 480),
                        Cesium.Cartesian3.fromDegrees(112.7218715, 35.6445378, 480)
                    ]
                },
                perPositionHeight: true,
                outline: false,
                // material: new Cesium.Color(38 / 255.0, 54 / 255.0, 82 / 255.0)
                material: Cesium.Color.fromCssColorString('#000723'),
                // outlineColor: Cesium.Color.BLACK.withAlpha(0.05)
            }
        })
    }
    return initObj;
})(axios, XbsjEarthUI)
initTree.init();