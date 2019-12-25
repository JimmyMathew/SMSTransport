using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SMSTransport.DAL;
using SMSTransport.Models;
using Newtonsoft.Json.Linq;

namespace SMSTransport.Controllers
{
    [Route("api/[controller]")]
    public class SalesController : Controller
    {
        SalesDAL salesDal = new SalesDAL();
        MasterDAL masterDal = new MasterDAL();

        #region Common
        [HttpPost("[action]")]
        public JsonResult ReadVehiclesOnType([FromBody] JObject data)
        {
            DailyVM dailyObj = data.ToObject<DailyVM>();
            return Json(masterDal.ReadVehcilesOnType(dailyObj.Vehicletype));
        }
        #endregion

        #region Sales
        [HttpGet("[action]")]
        public JsonResult ReadSale()
        {
            List<object> resultList = new List<object>();
            resultList.Add(salesDal.ReadSale());
            resultList.Add(masterDal.ReadVehicleTypes());
            return Json(resultList);
        }
        [HttpPost("[action]")]
        public JsonResult SaveSale([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            SalesVM saleObj = data.ToObject<SalesVM>();
            resultList.Add(saleObj.Id == 0 ? salesDal.SaveSale(saleObj) : salesDal.UpdateSale(saleObj));
            resultList.Add(ReadSale());
            return Json(resultList);
        }
        [HttpPost("[action]")]
        public JsonResult DeleteTire([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            SalesVM saleObj = data.ToObject<SalesVM>();
            resultList.Add(salesDal.DeleteSale(saleObj.Id));
            resultList.Add(ReadSale());
            return Json(resultList);
        }
        #endregion
    }
}