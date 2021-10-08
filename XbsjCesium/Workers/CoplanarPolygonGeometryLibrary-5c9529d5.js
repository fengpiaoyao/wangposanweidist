define(["exports","./Cartesian2-efe7a869","./Check-d18af7c4","./Transforms-850991ab","./OrientedBoundingBox-b07ded13"],function(n,g,e,f,l){"use strict";var t={},i=new g.Cartesian3,x=new g.Cartesian3,B=new g.Cartesian3,P=new g.Cartesian3,M=new l.OrientedBoundingBox;function o(n,e,t,r,a){e=g.Cartesian3.subtract(n,e,i),t=g.Cartesian3.dot(t,e),e=g.Cartesian3.dot(r,e);return g.Cartesian2.fromElements(t,e,a)}t.validOutline=function(n){var e=l.OrientedBoundingBox.fromPoints(n,M).halfAxes,t=f.Matrix3.getColumn(e,0,x),n=f.Matrix3.getColumn(e,1,B),e=f.Matrix3.getColumn(e,2,P),t=g.Cartesian3.magnitude(t),n=g.Cartesian3.magnitude(n),e=g.Cartesian3.magnitude(e);return!(0===t&&(0===n||0===e)||0===n&&0===e)},t.computeProjectTo2DArguments=function(n,e,t,r){var a,i,o=l.OrientedBoundingBox.fromPoints(n,M),u=o.halfAxes,s=f.Matrix3.getColumn(u,0,x),C=f.Matrix3.getColumn(u,1,B),m=f.Matrix3.getColumn(u,2,P),c=g.Cartesian3.magnitude(s),d=g.Cartesian3.magnitude(C),n=g.Cartesian3.magnitude(m),u=Math.min(c,d,n);return(0!==c||0!==d&&0!==n)&&(0!==d||0!==n)&&(u!==d&&u!==n||(a=s),u===c?a=C:u===n&&(i=C),u!==c&&u!==d||(i=m),g.Cartesian3.normalize(a,t),g.Cartesian3.normalize(i,r),g.Cartesian3.clone(o.center,e),!0)},t.createProjectPointsTo2DFunction=function(r,a,i){return function(n){for(var e=new Array(n.length),t=0;t<n.length;t++)e[t]=o(n[t],r,a,i);return e}},t.createProjectPointTo2DFunction=function(t,r,a){return function(n,e){return o(n,t,r,a,e)}},n.CoplanarPolygonGeometryLibrary=t});