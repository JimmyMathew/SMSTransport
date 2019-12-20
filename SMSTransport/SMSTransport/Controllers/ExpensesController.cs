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

        #region DailyExpenses
        [HttpGet("[action]")]
        public JsonResult ReadDaily()
        {

            return Json(expDal.ReadDaily());
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
    }
}