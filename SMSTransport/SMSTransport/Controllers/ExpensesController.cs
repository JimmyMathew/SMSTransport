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
    public class ExpensesController : Controller
    {
        ExpenseDAL expDal = new ExpenseDAL();
        MasterDAL masterDal = new MasterDAL();

        #region Common
        [HttpPost("[action]")]
        public JsonResult ReadVehiclesOnType([FromBody] JObject data)
        {
            DailyVM dailyObj = data.ToObject<DailyVM>();
            return Json(masterDal.ReadVehcilesOnType(dailyObj.Vehicletype));
        }
        #endregion

        #region DailyExpenses
        [HttpGet("[action]")]
        public JsonResult ReadDaily()
        {
            List<object> resultList = new List<object>();
            resultList.Add(expDal.ReadDaily());
            resultList.Add(masterDal.ReadVehicleTypes());
            return Json(resultList);
        }

        [HttpPost("[action]")]
        public JsonResult SaveDaily([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            DailyVM dailyObj = data.ToObject<DailyVM>();
            resultList.Add(dailyObj.Id == 0 ? expDal.SaveDaily(dailyObj) : expDal.UpdateDaily(dailyObj));
            resultList.Add(ReadDaily());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteDaily([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            DailyVM dailyObj = data.ToObject<DailyVM>();
            resultList.Add(expDal.DeleteDaily(dailyObj.Id));
            resultList.Add(ReadDaily());
            return Json(resultList);
        }
        #endregion

        #region RTOExpenses
        [HttpGet("[action]")]
        public JsonResult ReadRto()
        {
            List<object> resultList = new List<object>();
            resultList.Add(expDal.ReadRto());
            resultList.Add(masterDal.ReadVehicleTypes());
            return Json(resultList);
        }
        [HttpPost("[action]")]
        public JsonResult SaveRto([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            RtoVM rtoObj = data.ToObject<RtoVM>();
            resultList.Add(rtoObj.Id == 0 ? expDal.SaveRto(rtoObj) : expDal.UpdateRto(rtoObj));
            resultList.Add(ReadRto());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteRto([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            RtoVM rtoObj = data.ToObject<RtoVM>();
            resultList.Add(expDal.DeleteRto(rtoObj.Id));
            resultList.Add(ReadRto());
            return Json(resultList);
        }
        #endregion

        #region MechanicExpenses
        [HttpGet("[action]")]
        public JsonResult ReadMechanic()
        {
            List<object> resultList = new List<object>();
            resultList.Add(expDal.ReadMechanic());
            resultList.Add(masterDal.ReadVehicleTypes());
            return Json(resultList);
        }
        [HttpPost("[action]")]
        public JsonResult SaveMechanic([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            MechanicVM mechObj = data.ToObject<MechanicVM>();
            resultList.Add(mechObj.Id == 0 ? expDal.SaveMechanic(mechObj) : expDal.UpdateMechanic(mechObj));
            resultList.Add(ReadMechanic());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteMechanic([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            MechanicVM mechObj = data.ToObject<MechanicVM>();
            resultList.Add(expDal.DeleteMechanic(mechObj.Id));
            resultList.Add(ReadMechanic());
            return Json(resultList);
        }
        #endregion

        #region MiscellaneousExpenses
        [HttpGet("[action]")]
        public JsonResult ReadMisc()
        {
            List<object> resultList = new List<object>();
            resultList.Add(expDal.ReadMisc());
            resultList.Add(masterDal.ReadVehicleTypes());
            return Json(resultList);
        }
        [HttpPost("[action]")]
        public JsonResult SaveMisc([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            MiscVM miscObj = data.ToObject<MiscVM>();
            resultList.Add(miscObj.Id == 0 ? expDal.SaveMisc(miscObj) : expDal.UpdateMisc(miscObj));
            resultList.Add(ReadMisc());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteMisc([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            MiscVM miscObj = data.ToObject<MiscVM>();
            resultList.Add(expDal.DeleteMisc(miscObj.Id));
            resultList.Add(ReadMisc());
            return Json(resultList);
        }
        #endregion
    }
}