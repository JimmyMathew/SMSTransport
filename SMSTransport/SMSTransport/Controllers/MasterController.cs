using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SMSTransport.DAL;
using SMSTransport.Models;
using Newtonsoft.Json.Linq;

namespace SMSTransport.Controllers
{
    [Route("api/[controller]")]
    public class MasterController : Controller
    {
        MasterDAL masterDal = new MasterDAL();

        #region Drivers
        [HttpGet("[action]")]
        public JsonResult ReadDrivers()
        {
            return Json(masterDal.ReadDrivers());
        }
        [HttpPost("[action]")]
        public JsonResult SaveDriver([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            DriverVM driverObj = data.ToObject<DriverVM>();
            resultList.Add(driverObj.Driverid == 0 ? masterDal.SaveDriver(driverObj) : masterDal.UpdateDriver(driverObj));
            resultList.Add(ReadDrivers());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteDriver([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            DriverVM driverObj = data.ToObject<DriverVM>();
            resultList.Add(masterDal.DeleteDriver(driverObj.Driverid));
            resultList.Add(ReadDrivers());
            return Json(resultList);
        }
        #endregion
    }
}