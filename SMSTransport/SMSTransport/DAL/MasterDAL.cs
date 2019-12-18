using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SMSTransport.smstransport;
using SMSTransport.Models;

namespace SMSTransport.DAL
{
    public class MasterDAL : Controller
    {
        smstransportContext entities = new smstransportContext();

        #region Drivers
        public List<DriverVM> ReadDrivers()
        {
            return entities.Driver.Select(x => new DriverVM
            {
                Driverid = x.Driverid,
                Drivername = x.Drivername,
                Mobile = x.Mobile,
                Address = x.Address
            }).OrderByDescending(x => x.Driverid).ToList();
        }
        public Response SaveDriver(DriverVM obj)
        {
            List<DriverVM> testList = new List<DriverVM>();
            var IsExist = entities.Driver.Where(x => x.Drivername == obj.Drivername).ToList();
            if (IsExist.Count == 0)
            {
                Driver driverObj = new Driver();
                driverObj.Drivername = obj.Drivername;
                driverObj.Mobile = obj.Mobile;
                driverObj.Address = obj.Address;
                driverObj.Createdby = "Admin";
                driverObj.Createdon = DateTime.Now;
                driverObj.Updatedby = "Admin";
                driverObj.Updatedon = DateTime.Now;
                entities.Driver.Add(driverObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Driver details successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Driver Name already exists." };
        }
        public Response UpdateDriver(DriverVM obj)
        {
            List<DriverVM> testList = new List<DriverVM>();
            var IsExist = entities.Driver.Where(x => x.Driverid == obj.Driverid).ToList();
            if (IsExist.Count != 0)
            {
                var driverObj = entities.Driver.Where(x => x.Driverid == obj.Driverid).FirstOrDefault();
                driverObj.Drivername = obj.Drivername;
                driverObj.Mobile = obj.Mobile;
                driverObj.Address = obj.Address;
                driverObj.Createdby = "Admin";
                driverObj.Createdon = DateTime.Now;
                driverObj.Updatedby = "Admin";
                driverObj.Updatedon = DateTime.Now;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Driver details successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteDriver(long id)
        {
            var driverObj = entities.Driver.Where(x => x.Driverid == id).FirstOrDefault();
            if (driverObj != null)
            {

                entities.Driver.Remove(driverObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: "+ e.Message };

                }
                return new Response { IsSuccess = true, Message = "Driver details deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion
    }
}
