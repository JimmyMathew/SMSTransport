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

        #region Vehicles
        [HttpGet("[action]")]
        public JsonResult ReadVehicles()
        {
            return Json(masterDal.ReadVehicles());
        }
        [HttpPost("[action]")]
        public JsonResult SaveVehicle([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            VehicleVM vehicleObj = data.ToObject<VehicleVM>();
            resultList.Add(vehicleObj.Veicleid == 0 ? masterDal.SaveVehicle(vehicleObj) : masterDal.UpdateVehicle(vehicleObj));
            resultList.Add(ReadVehicles());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteVehicle([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            VehicleVM vehicleObj = data.ToObject<VehicleVM>();
            resultList.Add(masterDal.DeleteVehicle(vehicleObj.Veicleid));
            resultList.Add(ReadVehicles());
            return Json(resultList);
        }
        #endregion

        #region Parties
        [HttpGet("[action]")]
        public JsonResult ReadParties()
        {
            return Json(masterDal.ReadParties());
        }
        [HttpPost("[action]")]
        public JsonResult SaveParty([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            PartyVM partyObj = data.ToObject<PartyVM>();
            resultList.Add(partyObj.Partyid == 0 ? masterDal.SaveParty(partyObj) : masterDal.UpdateParty(partyObj));
            resultList.Add(ReadParties());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteParty([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            PartyVM partyObj = data.ToObject<PartyVM>();
            resultList.Add(masterDal.DeleteParty(partyObj.Partyid));
            resultList.Add(ReadParties());
            return Json(resultList);
        }
        #endregion
    }
}