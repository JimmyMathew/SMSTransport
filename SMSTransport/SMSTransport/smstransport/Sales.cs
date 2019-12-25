using System;
using System.Collections.Generic;

namespace SMSTransport.smstransport
{
    public partial class Sales
    {
        public long Id { get; set; }
        public string Date { get; set; }
        public string Vehicletype { get; set; }
        public string Vehicleno { get; set; }
        public string Driver { get; set; }
        public string Mode { get; set; }
        public string Party { get; set; }
        public string Rentdetail { get; set; }
        public string Loadfrom { get; set; }
        public string Loadto { get; set; }
        public string Ratetype { get; set; }
        public float Rate { get; set; }
        public float Ton { get; set; }
        public float Startingkm { get; set; }
        public float Closingkm { get; set; }
        public float Expensekm { get; set; }
        public float Total { get; set; }
    }
}
