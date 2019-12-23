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

        #region RTOExpenses
        public List<RtoVM> ReadRto()
        {
            return entities.Rtoexpenses.Select(x => new RtoVM
            {
                Id = x.Id,
                Date = x.Date,
                Vehicletype = x.Vehicletype,
                Vehicleno = x.Vehicleno,
                Tax = x.Tax,
                Insurance = x.Insurance,
                Fc = x.Fc,
                Total = x.Total
            }).OrderByDescending(x => x.Id).ToList();
        }
        public Response SaveRto(RtoVM obj)
        {
            if (obj != null)
            {
                Rtoexpenses rtoObj = new Rtoexpenses();
                rtoObj.Date = obj.Date;
                rtoObj.Vehicletype = obj.Vehicletype;
                rtoObj.Vehicleno = obj.Vehicleno;
                rtoObj.Tax = obj.Tax;
                rtoObj.Insurance = obj.Insurance;
                rtoObj.Fc = obj.Fc;
                rtoObj.Total = obj.Total;
                entities.Rtoexpenses.Add(rtoObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "RTO expenses successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Insertion Error.Contact Administrator." };
        }
        public Response UpdateRto(RtoVM obj)
        {
            var IsExist = entities.Rtoexpenses.Where(x => x.Id == obj.Id).ToList();
            if (IsExist.Count != 0)
            {
                var rtoObj = entities.Rtoexpenses.Where(x => x.Id == obj.Id).FirstOrDefault();
                rtoObj.Date = obj.Date;
                rtoObj.Vehicletype = obj.Vehicletype;
                rtoObj.Vehicleno = obj.Vehicleno;
                rtoObj.Tax = obj.Tax;
                rtoObj.Insurance = obj.Insurance;
                rtoObj.Fc = obj.Fc;
                rtoObj.Total = obj.Total;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "RTO expenses successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteRto(long id)
        {
            var rtoObj = entities.Rtoexpenses.Where(x => x.Id == id).FirstOrDefault();
            if (rtoObj != null)
            {

                entities.Rtoexpenses.Remove(rtoObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "RTO expenses deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion

        #region MechanicExpenses
        public List<MechanicVM> ReadMechanic()
        {
            return entities.Mechanicexpenses.Select(x => new MechanicVM
            {
                Id = x.Id,
                Date = x.Date,
                Vehicletype = x.Vehicletype,
                Vehicleno = x.Vehicleno,
                Description = x.Description,
                Mechaniclobor = x.Mechaniclobor,
                Electriclabor = x.Electriclabor,
                Bodywork = x.Bodywork,
                Oilchange = x.Oilchange,
                Total = x.Total
            }).OrderByDescending(x => x.Id).ToList();
        }
        public Response SaveMechanic(MechanicVM obj)
        {
            if (obj != null)
            {
                Mechanicexpenses mechObj = new Mechanicexpenses();
                mechObj.Date = obj.Date;
                mechObj.Vehicletype = obj.Vehicletype;
                mechObj.Vehicleno = obj.Vehicleno;
                mechObj.Description = obj.Description;
                mechObj.Mechaniclobor = obj.Mechaniclobor;
                mechObj.Electriclabor = obj.Electriclabor;
                mechObj.Bodywork = obj.Bodywork;
                mechObj.Oilchange = obj.Oilchange;
                mechObj.Total = obj.Total;
                entities.Mechanicexpenses.Add(mechObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Mechanic expenses successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Insertion Error.Contact Administrator." };
        }
        public Response UpdateMechanic(MechanicVM obj)
        {
            var IsExist = entities.Mechanicexpenses.Where(x => x.Id == obj.Id).ToList();
            if (IsExist.Count != 0)
            {
                var mechObj = entities.Mechanicexpenses.Where(x => x.Id == obj.Id).FirstOrDefault();
                mechObj.Date = obj.Date;
                mechObj.Vehicletype = obj.Vehicletype;
                mechObj.Vehicleno = obj.Vehicleno;
                mechObj.Description = obj.Description;
                mechObj.Mechaniclobor = obj.Mechaniclobor;
                mechObj.Electriclabor = obj.Electriclabor;
                mechObj.Bodywork = obj.Bodywork;
                mechObj.Oilchange = obj.Oilchange;
                mechObj.Total = obj.Total;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Mechanic expenses successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteMechanic(long id)
        {
            var mechObj = entities.Mechanicexpenses.Where(x => x.Id == id).FirstOrDefault();
            if (mechObj != null)
            {

                entities.Mechanicexpenses.Remove(mechObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Mechanic expenses deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion

        #region MiscellaneousExpenses
        public List<MiscVM> ReadMisc()
        {
            return entities.Miscexpenses.Select(x => new MiscVM
            {
                Id = x.Id,
                Date = x.Date,
                Vehicletype = x.Vehicletype,
                Vehicleno = x.Vehicleno,
                Pc = x.Pc,
                Rdo = x.Rdo,
                Rto = x.Rto,
                Total = x.Total
            }).OrderByDescending(x => x.Id).ToList();
        }
        public Response SaveMisc(MiscVM obj)
        {
            if (obj != null)
            {
                Miscexpenses miscObj = new Miscexpenses();
                miscObj.Date = obj.Date;
                miscObj.Vehicletype = obj.Vehicletype;
                miscObj.Vehicleno = obj.Vehicleno;
                miscObj.Pc = obj.Pc;
                miscObj.Rdo = obj.Rdo;
                miscObj.Rto = obj.Rto;
                miscObj.Total = obj.Total;
                entities.Miscexpenses.Add(miscObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Miscellaneous expenses successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Insertion Error.Contact Administrator." };
        }
        public Response UpdateMisc(MiscVM obj)
        {
            var IsExist = entities.Miscexpenses.Where(x => x.Id == obj.Id).ToList();
            if (IsExist.Count != 0)
            {
                var miscObj = entities.Miscexpenses.Where(x => x.Id == obj.Id).FirstOrDefault();
                miscObj.Date = obj.Date;
                miscObj.Vehicletype = obj.Vehicletype;
                miscObj.Vehicleno = obj.Vehicleno;
                miscObj.Pc = obj.Pc;
                miscObj.Rdo = obj.Rdo;
                miscObj.Rto = obj.Rto;
                miscObj.Total = obj.Total;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Miscellaneous expenses successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteMisc(long id)
        {
            var miscObj = entities.Miscexpenses.Where(x => x.Id == id).FirstOrDefault();
            if (miscObj != null)
            {

                entities.Miscexpenses.Remove(miscObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Miscellaneous expenses deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion

    }
}
