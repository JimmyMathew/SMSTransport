using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SMSTransport.smstransport;
using SMSTransport.Models;

namespace SMSTransport.DAL
{
    public class SalesDAL : Controller
    {
        smstransportContext entities = new smstransportContext();

        #region Sales
        public List<SalesVM> ReadSale()
        {
            return entities.Sales.Select(x => new SalesVM
            {
                Id = x.Id,
                Date = x.Date,
                Vehicletype = x.Vehicletype,
                Vehicleno = x.Vehicleno,
                Drivername = x.Driver,
                Mode = x.Mode,
                Partyname = x.Party,
                Rentdetail = x.Rentdetail,
                Loadfrom = x.Loadfrom,
                Loadto = x.Loadto,
                Ratetype = x.Rentdetail,
                Rate = x.Rate,
                Ton = x.Ton,
                Startingkm = x.Startingkm,
                Closingkm = x.Closingkm,
                Expensekm = x.Expensekm,
                Total = x.Total
            }).OrderByDescending(x => x.Id).ToList();
        }
        public Response SaveSale(SalesVM obj)
        {
            if (obj != null)
            {
                Sales saleObj = new Sales();
                saleObj.Date = obj.Date;
                saleObj.Vehicletype = obj.Vehicletype;
                saleObj.Vehicleno = obj.Vehicleno;
                saleObj.Driver = obj.Drivername;
                saleObj.Mode = obj.Mode;
                saleObj.Party = obj.Partyname;
                saleObj.Rentdetail = obj.Rentdetail;
                saleObj.Loadfrom = obj.Loadfrom;
                saleObj.Loadto = obj.Loadto;
                saleObj.Ratetype = obj.Ratetype;
                saleObj.Rate = obj.Rate;
                saleObj.Ton = obj.Ton;
                saleObj.Startingkm = obj.Startingkm;
                saleObj.Closingkm = obj.Closingkm;
                saleObj.Expensekm = obj.Expensekm;
                saleObj.Total = obj.Total;
                entities.Sales.Add(saleObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Sales details successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Insertion Error.Contact Administrator." };
        }
        public Response UpdateSale(SalesVM obj)
        {
            var IsExist = entities.Sales.Where(x => x.Id == obj.Id).ToList();
            if (IsExist.Count != 0)
            {
                var saleObj = entities.Sales.Where(x => x.Id == obj.Id).FirstOrDefault();
                saleObj.Date = obj.Date;
                saleObj.Vehicletype = obj.Vehicletype;
                saleObj.Vehicleno = obj.Vehicleno;
                saleObj.Driver = obj.Drivername;
                saleObj.Mode = obj.Mode;
                saleObj.Party = obj.Partyname;
                saleObj.Rentdetail = obj.Rentdetail;
                saleObj.Loadfrom = obj.Loadfrom;
                saleObj.Loadto = obj.Loadto;
                saleObj.Ratetype = obj.Ratetype;
                saleObj.Rate = obj.Rate;
                saleObj.Ton = obj.Ton;
                saleObj.Startingkm = obj.Startingkm;
                saleObj.Closingkm = obj.Closingkm;
                saleObj.Expensekm = obj.Expensekm;
                saleObj.Total = obj.Total;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Sales details successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteSale(long id)
        {
            var saleObj = entities.Sales.Where(x => x.Id == id).FirstOrDefault();
            if (saleObj != null)
            {

                entities.Sales.Remove(saleObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Sales details deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion
    }
}
