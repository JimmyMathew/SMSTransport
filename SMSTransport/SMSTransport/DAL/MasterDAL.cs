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
            var IsExist = entities.Driver.Where(x => x.Driverid == obj.Driverid).ToList();
            if (IsExist.Count != 0)
            {
                var driverObj = entities.Driver.Where(x => x.Driverid == obj.Driverid).FirstOrDefault();
                driverObj.Drivername = obj.Drivername;
                driverObj.Mobile = obj.Mobile;
                driverObj.Address = obj.Address;
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
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Driver details deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion

        #region Vehicles
        public List<VehicleVM> ReadVehicles()
        {
            return entities.Vehicle.Select(x => new VehicleVM
            {
                Veicleid = x.Veicleid,
                Vehicletype = x.Vehicletype,
                Vehicleno = x.Vehicleno
            }).OrderByDescending(x => x.Veicleid).ToList();
        }
        public Response SaveVehicle(VehicleVM obj)
        {
            var IsExist = entities.Vehicle.Where(x => x.Vehicleno == obj.Vehicleno).ToList();
            if (IsExist.Count == 0)
            {
                Vehicle vehicleObj = new Vehicle();
                vehicleObj.Vehicletype = obj.Vehicletype;
                vehicleObj.Vehicleno = obj.Vehicleno;
                vehicleObj.Createdby = "Admin";
                vehicleObj.Createdon = DateTime.Now;
                vehicleObj.Updatedby = "Admin";
                vehicleObj.Updatedon = DateTime.Now;
                entities.Vehicle.Add(vehicleObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Vehicle details successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Vehicle number already exists." };
        }
        public Response UpdateVehicle(VehicleVM obj)
        {
            var IsExist = entities.Vehicle.Where(x => x.Veicleid == obj.Veicleid).ToList();
            if (IsExist.Count != 0)
            {
                var vehicleObj = entities.Vehicle.Where(x => x.Veicleid == obj.Veicleid).FirstOrDefault();
                vehicleObj.Vehicletype = obj.Vehicletype;
                vehicleObj.Vehicleno = obj.Vehicleno;
                vehicleObj.Updatedby = "Admin";
                vehicleObj.Updatedon = DateTime.Now;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Vehicle details successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteVehicle(long id)
        {
            var vehicleObj = entities.Vehicle.Where(x => x.Veicleid == id).FirstOrDefault();
            if (vehicleObj != null)
            {

                entities.Vehicle.Remove(vehicleObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Vehicle details deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion

        #region Parties
        public List<PartyVM> ReadParties()
        {
            return entities.Party.Select(x => new PartyVM
            {
                Partyid = x.Partyid,
                Partytype = x.Partytype,
                Partyname = x.Partyname,
                Mobile = x.Mobile,
                Telephone = x.Telephone,
                Address = x.Address,
                Email = x.Email,
                Pancard = x.Pancard,
                Gstin = x.Gstin
            }).OrderByDescending(x => x.Partyid).ToList();
        }
        public Response SaveParty(PartyVM obj)
        {
            var IsExist = entities.Party.Where(x => x.Partyname == obj.Partyname).ToList();
            if (IsExist.Count == 0)
            {
                Party partyObj = new Party();
                partyObj.Partytype = obj.Partytype;
                partyObj.Partyname = obj.Partyname;
                partyObj.Mobile = obj.Mobile;
                partyObj.Telephone = obj.Telephone;
                partyObj.Address = obj.Address;
                partyObj.Email = obj.Email;
                partyObj.Pancard = obj.Pancard;
                partyObj.Gstin = obj.Gstin;
                partyObj.Createdby = "Admin";
                partyObj.Createdon = DateTime.Now;
                partyObj.Updatedby = "Admin";
                partyObj.Updatedon = DateTime.Now;
                entities.Party.Add(partyObj);
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Party details successfully added." };
            }
            else
                return new Response { IsSuccess = false, Message = "Party name already exists." };
        }
        public Response UpdateParty(PartyVM obj)
        {
            var IsExist = entities.Party.Where(x => x.Partyid == obj.Partyid).ToList();
            if (IsExist.Count != 0)
            {
                var partyObj = entities.Party.Where(x => x.Partyid == obj.Partyid).FirstOrDefault();
                partyObj.Partytype = obj.Partytype;
                partyObj.Partyname = obj.Partyname;
                partyObj.Mobile = obj.Mobile;
                partyObj.Telephone = obj.Telephone;
                partyObj.Address = obj.Address;
                partyObj.Email = obj.Email;
                partyObj.Pancard = obj.Pancard;
                partyObj.Gstin = obj.Gstin;
                partyObj.Updatedby = "Admin";
                partyObj.Updatedon = DateTime.Now;
                entities.SaveChanges();
                return new Response { IsSuccess = true, Message = "Party details successfully updated" };
            }
            else
                return new Response { IsSuccess = false, Message = "Updation Error. Contact Administrator" };
        }
        public Response DeleteParty(long id)
        {
            var partyObj = entities.Party.Where(x => x.Partyid == id).FirstOrDefault();
            if (partyObj != null)
            {

                entities.Party.Remove(partyObj);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    return new Response { IsSuccess = false, Message = "Deletion Error: " + e.Message };

                }
                return new Response { IsSuccess = true, Message = "Party details deleted successfully" };
            }
            else
                return new Response { IsSuccess = false, Message = "Deletion error. Contact Administrator" };
        }
        #endregion

    }
}
