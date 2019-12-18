using System;
using System.Collections.Generic;

namespace SMSTransport.smstransport
{
    public partial class Party
    {
        public long Partyid { get; set; }
        public string Partytype { get; set; }
        public string Partyname { get; set; }
        public long? Mobile { get; set; }
        public long? Telephone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Pancard { get; set; }
        public string Gstin { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createdon { get; set; }
        public string Updatedby { get; set; }
        public DateTime? Updatedon { get; set; }
    }
}
