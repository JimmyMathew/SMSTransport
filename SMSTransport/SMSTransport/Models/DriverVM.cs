using System;
using System.Collections.Generic;

namespace SMSTransport.Models
{
    public partial class DriverVM
    {
        public long Driverid { get; set; }
        public string Drivername { get; set; }
        public long? Mobile { get; set; }
        public string Address { get; set; }
    }
}
