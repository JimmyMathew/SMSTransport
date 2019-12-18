using System;
using System.Collections.Generic;

namespace SMSTransport.smstransport
{
    public partial class Driver
    {
        public long Driverid { get; set; }
        public string Drivername { get; set; }
        public long? Mobile { get; set; }
        public string Address { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createdon { get; set; }
        public string Updatedby { get; set; }
        public DateTime? Updatedon { get; set; }
    }
}
