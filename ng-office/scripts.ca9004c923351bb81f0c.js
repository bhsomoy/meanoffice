TweenMax.ticker.fps(60);var $mDingy=$("#middle-dingy"),$minute=$(".minute-hand"),$hour=$(".hour-hand"),$door=$("#door"),$figurine=$(".figurine"),$mill=$(".mill"),$doorOne=$("#door_1_"),$chick=$("#chick");function sceneOne(){var e=new TimelineLite;return e.add("start"),e.from($minute,3,{rotation:-10,transformOrigin:"0% 100%",ease:Power2.easeOut}).from($hour,1,{rotation:-10,transformOrigin:"0% 100%",ease:Power2.easeOut},"start").to($door,2,{scaleX:.1,ease:Back.easeOut},"start+=2").to($doorOne,2,{scaleX:.1,transformOrigin:"100% 0%",ease:Back.easeOut},"start+=2").from($chick,2,{opacity:0,y:5,ease:Back.easeOut},"start+=4"),e.add("playtime","-=2"),e.to($mill,5,{rotation:360,repeat:2,transformOrigin:"50% 50%",ease:Power2.easeInOut},"playtime").from($figurine,2,{scaleX:0,transformOrigin:"50% 50%",ease:Back.easeOut},"playtime+=2").to($figurine,4,{x:-100,ease:Elastic.easeOut},"playtime+=3").from($figurine,.5,{rotation:0},"playtime").fromTo($figurine,1.5,{rotation:-6,transformOrigin:"50% 100%"},{rotation:0,transformOrigin:"50% 100%",repeat:4,yoyo:!0,ease:Elastic.easeOut},"playtime+=4.5"),e.add("putaway","-=5"),e.to($figurine,2,{x:0,ease:Power2.easeIn},"putaway").to($chick,2,{opacity:0,y:5,ease:Back.easeIn},"putaway+=2").to($door,2,{scaleX:1,ease:Elastic.easeIn},"putaway+=4").to($doorOne,2,{scaleX:1,transformOrigin:"100% 0%",ease:Elastic.easeIn},"putaway+=4"),e.fromTo($mDingy,2,{rotation:-30,y:-20,transformOrigin:"50% 0%"},{rotation:30,y:-20,transformOrigin:"50% 0%",repeat:-1,yoyo:!0,ease:Power2.easeInOut},"start"),e}TweenMax.set("#chick",{visibility:"visible"});var master=new TimelineLite;master.add(sceneOne(),"scene1");