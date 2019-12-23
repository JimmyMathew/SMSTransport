using System;
using System.Collections.Generic;

namespace SMSTransport.smstransport
{
    public partial class Mechanicexpenses
    {
        public long Id { get; set; }
        public string Date { get; set; }
        public string Vehicletype { get; set; }
        public string Vehicleno { get; set; }
        public string Description { get; set; }
        public float Mechaniclobor { get; set; }
        public float Electriclabor { get; set; }
        public int Bodywork { get; set; }
        public float Oilchange { get; set; }
        public float Total { get; set; }
    }
}
