AFRAME.registerComponent("bullets",{
    init:function(){
        this.ShowBullets()
    },
    ShowBullets:function(){
window.addEventListener("keydown",(e)=>{
    if(e.key==="z"){
        var bullets=document.createElement("a-entity")
        bullets.setAttribute("geometry",{
            primitive:"sphere",
            radius: 0.1,


        })
        bullets.setAttribute("material","color","black");
        var cam=document.querySelector("#camera");
        pos= cam.getAttribute("position");
        bullets.setAttribute("position",{
            x:pos.x,
            y:pos.y,
            z:pos.z,
        })
        bullets.setAttribute("velocity",{x:0,y:0,z:-1})
        var camera=document.querySelector("#camera").object3D
        var direction=new THREE.Vector3()
        camera.getWorldDirection(direction)
        bullets.setAttribute("velocity",direction.multiplyScalar(-10))
        var scene=document.querySelector("#scene")
        bullets.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:"0"
        })
        bullets.addEventListener("collide",this.removeBullet)
        scene.appendChild (bullets)
    }
})
    },
    removeBullet:function(e){
console.log(e.detail.target.el)

console.log(e.detail.body.el)

var element=e.detail.target.el

var elementHit=e.detail.body.el

if(elementHit.id.includes("box")){
    elementHit.setAttribute("material",{
        opacity:1,transparent:true
    })
    var impulse=new CANNON.Vec3(-2,2,1)
    var worldPoint=new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
    )
    elementHit.body.applyImpulse(impulse,worldPoint)
    element.removeEventListener("collide",this.shoot)
    var scene=document.querySelector("#scene")
    scene.removeChild(element)
}
    }

})