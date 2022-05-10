Ext.define('IoTosOmExt.model.export.bookinglist.BookingList', {
	extend : 'IoTosOmExt.model.common.container.BaseContainer',
	fields: [{ 
      name: 'checkCancel'
   },{ 
      name: 'cancelChk',
      convert : function(value) {
         if(value == 'Y' || value == true) {
            return true;
         }else {
            return false;
         }
      }
   },{ 
      name: 'bookingQty'
   },{ 
      name: 'socQty'
   },{ 
      name: 'emtyPuQty'
   },{ 
      name: 'releaseQty'
   },{ 
      name: 'gateInQty'
   },{ 
      name: 'wgtGrp'
   },{ 
      name: 'vent'
   },{ 
      name: 'gateinCate'
   },{ 
      name : 'toppingChk',
      type : 'boolean'
   },{ 
      name: 'puDateFlag'
   },{ 
      name: 'puDate', 
      type: 'date', 
      dateFormat: 'time'
   },{ 
      name: 'puPlace'
   },{ 
      name: 'refBookingNo'
   },{ 
      name: 'pickupBookingQty'
   },{ 
      name: 'bookingListDetail'
   },{ 
      name: 'isDummyBooking'
   },{ 
      name: 'pickupableQty'
   },{ 
      name: 'hasDummyBooking'
   },{ 
      name: 'needToUpdateQty'
   },{ 
      name: 'rowLock'
   },{ 
      name: 'displaySetTempF'
   },{ 
      name: 'otherTmnlVslNm'
   },{ 
      name: 'puFromDate'
   },{ 
      name: 'assignQty'
   },{ 
      name: 'nominate'
   },{ 
      name: 'orgAssignedCntrItems'
   },{ 
      name: 'assignedCntrItems'
   },{ 
      name: 'assignedCntrChanged'
   }]
});