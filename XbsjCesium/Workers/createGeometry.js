define(["./when-208fe5b0","./PrimitivePipeline-38cf2a31","./createTaskProcessorWorker","./Transforms-850991ab","./Cartesian2-efe7a869","./Check-d18af7c4","./Math-cdf89016","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./GeometryAttribute-093afc1b","./GeometryAttributes-b0b294d8","./GeometryPipeline-ca8c8117","./AttributeCompression-c7a71097","./EncodedCartesian3-be129f5a","./IndexDatatype-48fbd80f","./IntersectionTests-322f2514","./Plane-e0b237ad","./WebMercatorProjection-7ff96b3a"],function(c,u,e,r,t,n,a,o,i,f,s,b,d,m,p,l,y,P,k){"use strict";var C={};return e(function(e,r){for(var t=e.subTasks,n=t.length,a=new Array(n),o=0;o<n;o++){var i=t[o],f=i.geometry,s=i.moduleName;c.defined(s)?(s=function(e){var r=C[e];return c.defined(r)||("object"==typeof exports?C[r]=r=require("Workers/"+e):require(["Workers/"+e],function(e){C[r=e]=e})),r}(s),a[o]=s(f,i.offset)):a[o]=f}return c.when.all(a,function(e){return u.PrimitivePipeline.packCreateGeometryResults(e,r)})})});
