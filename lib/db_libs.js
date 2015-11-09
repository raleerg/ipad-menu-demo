/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var dbLib = {
    support: false,
            
    __construct: function(){
        //this.testSupport();
    }(),
    testSupport: function(){
        var LSsupport = !(typeof window.localStorage == 'undefined');
        var SSsupport = !(typeof window.sessionStorage == 'undefined');

        if (LSsupport && SSsupport) {
            console.log( "localStorage and sessionStorage are available" );
            this.support = true;
        }else{
            console.log( "localStorage and sessionStorage are not available" );
            this.support = false;
        }
    },
    setLike: function(id){
        if(this.support){
            
            var obj = JSON.parse( localStorage.getItem( "obj" ) );
            
            if(!obj){
                var obj = {
                    "objName": "Likes",
                    "allLikes": new Array()
                }
            }
            console.log('id: '+id+' data: '+obj.allLikes[id]);
            if(obj.allLikes[id])
                obj.allLikes[id]++;
            else
                obj.allLikes[id] = 1;
            
            localStorage.setItem( "obj", JSON.stringify( obj ) );
        }
    },
    removeLikes: function(){
        if(this.support){
            localStorage.removeItem( "obj" );
        }
    },
    getLikes: function(){
        if(this.support){
            var obj = JSON.parse( localStorage.getItem( "obj" ) );
            return obj;
        }
    },
    getLike: function(id){
        if(this.support){
            var obj = JSON.parse( localStorage.getItem( "obj" ) );

            if(obj){
                if(obj.allLikes[id])
                    return obj.allLikes[id];
                 else
                    return 0;
            }else{
                return 0;
            }
            
        }
    }
};



