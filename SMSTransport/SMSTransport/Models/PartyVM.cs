using System;
using System.Collections.Generic;

namespace SMSTransport.Models
{
    public partial class PartyVM
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
    }
}
