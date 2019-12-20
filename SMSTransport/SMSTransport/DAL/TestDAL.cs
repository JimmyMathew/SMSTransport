using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SMSTransport.smstransport;
using SMSTransport.Models;

namespace SMSTransport.DAL
{
    public class TestDAL : Controller
    {
        smstransportContext entities = new smstransportContext();

        public List<TestView> ReadTestDeatils()
        {
            return entities.Test.Select(x => new TestView
            {
                Id = x.Id,
                Age = x.Age,
                Name = x.Name,
                Isactive = x.Isactive
            }).OrderByDescending(x => x.Id).ToList();
        }
        public Response SaveTest(TestView obj)
        {
            List<TestView> testList = new List<TestView>();
            var IsExist = entities.Test.Where(x => x.Name == obj.Name).ToList();
            if (IsExist.Count == 0)
            {
                Test testObj = new Test();
                testObj.Name = obj.Name;
                testObj.Age = obj.Age;
                testObj.Isactive = obj.Isactive;
                //testObj.updatedBy = "Admin";
                //testObj.updatedOn = DateTime.Now;
                entities.Test.Add(testObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Details Successfully Added" };
            }
            else
                return new Response { IsSuccess = false, Message = "Data already exists" };
        }
        public Response UpdateTest(TestView obj)
        {
            List<TestView> testList = new List<TestView>();
            var IsExist = entities.Test.Where(x => x.Id == obj.Id).ToList();
            if (IsExist.Count != 0)
            {
                var testObj = entities.Test.Where(x => x.Id == obj.Id).FirstOrDefault();
                testObj.Name = obj.Name;
                testObj.Age = obj.Age;
                testObj.Isactive = obj.Isactive;
                //testObj.updatedBy = "Admin";
                //testObj.updatedOn = DateTime.Now;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Details Successfully Updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteTest(int id)
        {
            var testObj = entities.Test.Where(x => x.Id == id).FirstOrDefault();
            if (testObj != null)
            {

                entities.Test.Remove(testObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Data deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Data deletion error" };
        }
    }
}
