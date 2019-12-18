using System;
using System.Collections.Generic;

namespace SMSTransport.smstransport
{
    public partial class Vehicle
    {
        public long Veicleid { get; set; }
        public string Vehicletype { get; set; }
        public string Vehicleno { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createdon { get; set; }
        public string Updatedby { get; set; }
        public DateTime? Updatedon { get; set; }
    }
}
