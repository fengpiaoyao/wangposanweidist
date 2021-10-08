define(["exports","./Cartesian2-efe7a869","./Check-d18af7c4","./when-208fe5b0","./Transforms-850991ab","./IntersectionTests-322f2514","./Plane-e0b237ad"],function(e,C,n,p,a,i,r){"use strict";function x(e,n,t){this.minimum=C.Cartesian3.clone(p.defaultValue(e,C.Cartesian3.ZERO)),this.maximum=C.Cartesian3.clone(p.defaultValue(n,C.Cartesian3.ZERO)),t=p.defined(t)?C.Cartesian3.clone(t):C.Cartesian3.midpoint(this.minimum,this.maximum,new C.Cartesian3),this.center=t}x.fromPoints=function(e,n){if(p.defined(n)||(n=new x),!p.defined(e)||0===e.length)return n.minimum=C.Cartesian3.clone(C.Cartesian3.ZERO,n.minimum),n.maximum=C.Cartesian3.clone(C.Cartesian3.ZERO,n.maximum),n.center=C.Cartesian3.clone(C.Cartesian3.ZERO,n.center),n;for(var t=e[0].x,i=e[0].y,a=e[0].z,r=e[0].x,s=e[0].y,o=e[0].z,m=e.length,l=1;l<m;l++)var c=e[l],u=c.x,d=c.y,c=c.z,t=Math.min(u,t),r=Math.max(u,r),i=Math.min(d,i),s=Math.max(d,s),a=Math.min(c,a),o=Math.max(c,o);var f=n.minimum;f.x=t,f.y=i,f.z=a;var h=n.maximum;return h.x=r,h.y=s,h.z=o,n.center=C.Cartesian3.midpoint(f,h,n.center),n},x.clone=function(e,n){if(p.defined(e))return p.defined(n)?(n.minimum=C.Cartesian3.clone(e.minimum,n.minimum),n.maximum=C.Cartesian3.clone(e.maximum,n.maximum),n.center=C.Cartesian3.clone(e.center,n.center),n):new x(e.minimum,e.maximum,e.center)},x.equals=function(e,n){return e===n||p.defined(e)&&p.defined(n)&&C.Cartesian3.equals(e.center,n.center)&&C.Cartesian3.equals(e.minimum,n.minimum)&&C.Cartesian3.equals(e.maximum,n.maximum)};var s=new C.Cartesian3;x.intersectPlane=function(e,n){s=C.Cartesian3.subtract(e.maximum,e.minimum,s);var t=C.Cartesian3.multiplyByScalar(s,.5,s),i=n.normal,t=t.x*Math.abs(i.x)+t.y*Math.abs(i.y)+t.z*Math.abs(i.z),n=C.Cartesian3.dot(e.center,i)+n.distance;return 0<n-t?a.Intersect.INSIDE:n+t<0?a.Intersect.OUTSIDE:a.Intersect.INTERSECTING},x.prototype.clone=function(e){return x.clone(this,e)},x.prototype.intersectPlane=function(e){return x.intersectPlane(this,e)},x.prototype.equals=function(e){return x.equals(this,e)};var o=new a.Cartesian4;function t(e,n){e=(n=p.defaultValue(n,C.Ellipsoid.WGS84)).scaleToGeodeticSurface(e);var t=a.Transforms.eastNorthUpToFixedFrame(e,n);this._ellipsoid=n,this._origin=e,this._xAxis=C.Cartesian3.fromCartesian4(a.Matrix4.getColumn(t,0,o)),this._yAxis=C.Cartesian3.fromCartesian4(a.Matrix4.getColumn(t,1,o));t=C.Cartesian3.fromCartesian4(a.Matrix4.getColumn(t,2,o));this._plane=r.Plane.fromPointNormal(e,t)}Object.defineProperties(t.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});var m=new x;t.fromPoints=function(e,n){return new t(x.fromPoints(e,m).center,n)};var l=new i.Ray,c=new C.Cartesian3;t.prototype.projectPointOntoPlane=function(e,n){var t=l;t.origin=e,C.Cartesian3.normalize(e,t.direction);e=i.IntersectionTests.rayPlane(t,this._plane,c);if(p.defined(e)||(C.Cartesian3.negate(t.direction,t.direction),e=i.IntersectionTests.rayPlane(t,this._plane,c)),p.defined(e)){t=C.Cartesian3.subtract(e,this._origin,e),e=C.Cartesian3.dot(this._xAxis,t),t=C.Cartesian3.dot(this._yAxis,t);return p.defined(n)?(n.x=e,n.y=t,n):new C.Cartesian2(e,t)}},t.prototype.projectPointsOntoPlane=function(e,n){p.defined(n)||(n=[]);for(var t=0,i=e.length,a=0;a<i;a++){var r=this.projectPointOntoPlane(e[a],n[t]);p.defined(r)&&(n[t]=r,t++)}return n.length=t,n},t.prototype.projectPointToNearestOnPlane=function(e,n){p.defined(n)||(n=new C.Cartesian2);var t=l;t.origin=e,C.Cartesian3.clone(this._plane.normal,t.direction);e=i.IntersectionTests.rayPlane(t,this._plane,c);p.defined(e)||(C.Cartesian3.negate(t.direction,t.direction),e=i.IntersectionTests.rayPlane(t,this._plane,c));t=C.Cartesian3.subtract(e,this._origin,e),e=C.Cartesian3.dot(this._xAxis,t),t=C.Cartesian3.dot(this._yAxis,t);return n.x=e,n.y=t,n},t.prototype.projectPointsToNearestOnPlane=function(e,n){p.defined(n)||(n=[]);var t=e.length;n.length=t;for(var i=0;i<t;i++)n[i]=this.projectPointToNearestOnPlane(e[i],n[i]);return n};var u=new C.Cartesian3;t.prototype.projectPointOntoEllipsoid=function(e,n){p.defined(n)||(n=new C.Cartesian3);var t=this._ellipsoid,i=this._origin,a=this._xAxis,r=this._yAxis,s=u;return C.Cartesian3.multiplyByScalar(a,e.x,s),n=C.Cartesian3.add(i,s,n),C.Cartesian3.multiplyByScalar(r,e.y,s),C.Cartesian3.add(n,s,n),t.scaleToGeocentricSurface(n,n),n},t.prototype.projectPointsOntoEllipsoid=function(e,n){var t=e.length;p.defined(n)?n.length=t:n=new Array(t);for(var i=0;i<t;++i)n[i]=this.projectPointOntoEllipsoid(e[i],n[i]);return n},e.AxisAlignedBoundingBox=x,e.EllipsoidTangentPlane=t});
