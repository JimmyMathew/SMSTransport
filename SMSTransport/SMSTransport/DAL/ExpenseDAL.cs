using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SMSTransport.smstransport;
using SMSTransport.Models;

namespace SMSTransport.DAL
{
    public class ExpenseDAL : Controller
    {
        smstransportContext entities = new smstransportContext();

        #region DailyExpenses
        public List<DailyVM> ReadDaily()
        {
            return entities.Dailyexpenses.Select(x => new DailyVM
            {
                Id = x.Id,
                Date = x.Date,
                Name = x.Name,
                Vehicletype = x.Vehicletype,
                Vehicleno = x.Vehicleno,
                Driverbata = x.Driverbata,
                Toll = x.Toll,
                Pass = x.Pass,
                Fuelrate = x.Fuelrate,
                Fuellitre = x.Fuellitre,
                Total = x.Total,
            }).OrderByDescending(x => x.Id).ToList();
        }
        public Response SaveDaily(DailyVM obj)
        {
            if (obj != null)
            {
                Dailyexpenses dailyObj = new Dailyexpenses();
                dailyObj.Date = obj.Date;
                dailyObj.Name = obj.Name;
                dailyObj.Vehicletype = obj.Vehicletype;
                dailyObj.Vehicleno = obj.Vehicleno;
                dailyObj.Driverbata = obj.Driverbata;
                dailyObj.Toll = obj.Toll;
                dailyObj.Pass = obj.Pass;
                dailyObj.Fuelrate = obj.Fuelrate;
                dailyObj.Fuellitre = obj.Fuellitre;
                dailyObj.Total = obj.Total;
                entities.Dailyexpenses.Add(dailyObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Daily expenses successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Insertion Error.Contact Administrator." };
        }
        public Response UpdateDaily(DailyVM obj)
        {
            var IsExist = entities.Dailyexpenses.Where(x => x.Id == obj.Id).ToList();
            if (IsExist.Count != 0)
            {
                var dailyObj = entities.Dailyexpenses.Where(x => x.Id == obj.Id).FirstOrDefault();
                dailyObj.Date = obj.Date;
                dailyObj.Name = obj.Name;
                dailyObj.Vehicletype = obj.Vehicletype;
                dailyObj.Vehicleno = obj.Vehicleno;
                dailyObj.Driverbata = obj.Driverbata;
                dailyObj.Toll = obj.Toll;
                dailyObj.Pass = obj.Pass;
                dailyObj.Fuelrate = obj.Fuelrate;
                dailyObj.Fuellitre = obj.Fuellitre;
                dailyObj.Total = obj.Total;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Daily expenses successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteDaily(long id)
        {
            var dailyObj = entities.Dailyexpenses.Where(x => x.Id == id).FirstOrDefault();
            if (dailyObj != null)
            {

                entities.Dailyexpenses.Remove(dailyObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Daily expenses deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion



    }
}
