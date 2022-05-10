var Ext = Ext || {};
Ext.REMOTING_API = {
    "id": "mainRemoteProvider",
//    "url": IoTosSpExt.config.Locale.getDirectApiDestUrl() + "/router",
    "type": "remoting",
    "actions": {
        "stowage": [{
            "name": "selectStowage",
            "len": 1,
        }, {
        	"name": "insertStowage",
            "len": 1,
            "metadata": {
            	"params": ["mode", "sharable", "messageId", "registeredUserId"]
            }
        }, {
        	"name": "updateStowage",
        	"len": 1,
            "metadata": {
            	"params": ["mode", "sharable", "messageId", "registeredUserId"]
            }
        }, {
        	"name": "deleteStowage",
        	"len": 1,
            "metadata": {
            	"params": ["mode", "sharable", "messageId", "registeredUserId"]
            }
        }, {
        	"name": "selectCrane",
        	"len": 1,
        }, {
        	"name": "insertCrane",
        	"len": 1,
        	"metadata": {
        		"params": ["sharable", "messageId", "registeredUserId"]
        	}
        }, {
        	"name": "updateCrane",
        	"len": 1,
        	"metadata": {
        		"params": ["sharable", "messageId", "registeredUserId"]
        	}
        }, {
        	"name": "deleteCrane",
        	"len": 1,
        	"metadata": {
        		"params": ["sharable", "messageId", "registeredUserId"]
        	}
        }, {
            "name": "selectFinalRestow",
            "len": 1
        }, {
            "name": "insertFinalRestow",
            "len": 1
        }, {
            "name": "updateFinalRestow",
            "len": 1
        }, {
            "name": "deleteFinalRestow",
            "len": 1
        }],
        "loadList": [{
            "name": "selectLoadList",
            "len": 1
        }, {
        	"name": "insertLoadList",
            "len": 1
        }, {
        	"name": "updateLoadList",
        	"len": 1
        }, {
        	"name": "deleteLoadList",
        	"len": 1
        }]
    },
    "timeout" : 180 * 1000,
    "maxRetries" : 0,
    "enableBuffer" : false
};

Ext.POLLING_MESSAGE_API = {
    "id": "messagePollProvider",
    "type": "polling",
//    "url": IoTosSpExt.config.Locale.getDirectApiDestUrl() + "/poll/pollingHandler/getMessage/event1",
    "interval": 5 * 1000
};

Ext.POLLING_SHARING_API = {
	"id": "sharingPollProvider",
	"type": "polling",
//	"url": IoTosSpExt.config.Locale.getDirectApiDestUrl() + "/poll/pollingHandler/shareMessage/event2",
	"interval": 5 * 1000
};

Ext.POLLING_OSPIF_API = {
	"id": "ospInterfacePollProvider",
	"type": "polling",
//	"url": IoTosSpExt.config.Locale.getDirectApiDestUrl() + "/poll/pollingHandler/getOspInterfaceMessage/event3",
	"interval": 3 * 1000
};
