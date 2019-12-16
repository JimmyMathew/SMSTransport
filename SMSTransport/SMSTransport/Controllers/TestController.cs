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
    public class TestController : Controller
    {
        TestDAL testDal = new TestDAL();
        [HttpGet("[action]")]
        public JsonResult ReadTest()
        {

            return Json(testDal.ReadTestDeatils());
        }
        [HttpPost("[action]")]
        public JsonResult SaveTest([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            TestView testObj = data.ToObject<TestView>();
            resultList.Add(testObj.Id == 0 ? testDal.SaveTest(testObj) : testDal.UpdateTest(testObj));
            resultList.Add(ReadTest());
            return Json(resultList);

        }
        [HttpPost("[action]")]
        public JsonResult DeleteTest([FromBody] JObject data)
        {
            List<object> resultList = new List<object>();
            TestView testObj = data.ToObject<TestView>();
            resultList.Add(testDal.DeleteTest(testObj.Id));
            resultList.Add(ReadTest());
            return Json(resultList);
        }
    }
}