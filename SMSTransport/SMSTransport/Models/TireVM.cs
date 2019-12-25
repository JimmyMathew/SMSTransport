using System;
using System.Collections.Generic;

namespace SMSTransport.Models
{
    public partial class TireVM
    {
        public long Id { get; set; }
        public string Date { get; set; }
        public string Vehicletype { get; set; }
        public string Vehicleno { get; set; }
        public string Tyretype { get; set; }
        public string Side { get; set; }
        public string Company { get; set; }
        public float Startkm { get; set; }
        public float Closekm { get; set; }
        public float Starthour { get; set; }
        public float Closehour { get; set; }
        public float Total { get; set; }
    }
}
