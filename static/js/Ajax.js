Library = {
    Ajax : {
        request : function(options){
            //store the initial callbacks
            var success = options.success;
            var failure = options.failure;
            
            
            Ext.apply(options, {
                success : function(response, requestOptions){
                    var jsonResponse;
                    try{
                        jsonResponse = Ext.util.JSON.decode(response.responseText);
                    } catch(e) { // responseText is not JSON
                        jsonResponse = {
                            success : false,
                            errorType : 'connection',
                            errorMsg : "Invalid server response."
                        };
                    }
                    
                    if(jsonResponse.success && success){
                        success.call(options.scope, jsonResponse, requestOptions);
                    }else if (failure) {
                        failure.call(options.scope, jsonResponse, requestOptions);
                    }
                },
                failure : function(response, requestOptions){
                    if(failure){
                        var jsonResponse = {
                            success : false
                        };
                        if(response.isTimeout){
                            jsonResponse.errorType = 'connection';
                            jsonResponse.errorMsg = "Connection timeout.";
                        }else {
                            jsonResponse.errorType = 'connection';
                            jsonResponse.errorMsg = "Unknown error.";
                        }
                        
                        failure.call(options.scope || window, jsonResponse, requestOptions);
                    }
                }
            });
            
            //encode the parameters if object
            var params = options.params;
            Ext.iterate(params, function(key, value){
                if(typeof value == 'object'){
                    params[key] = Ext.encode(value);
                }
            });
            
            // finally submit request
            Ext.Ajax.request(options);
        }
    }
};
