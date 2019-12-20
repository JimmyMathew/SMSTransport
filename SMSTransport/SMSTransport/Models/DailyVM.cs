using System;
using System.Collections.Generic;

namespace SMSTransport.Models
{
    public partial class DailyVM
    {
        public long Id { get; set; }
        public string Date { get; set; }
        public string Name { get; set; }
        public string Vehicletype { get; set; }
        public string Vehicleno { get; set; }
        public float? Driverbata { get; set; }
        public float? Toll { get; set; }
        public float? Pass { get; set; }
        public float? Fuelrate { get; set; }
        public float? Fuellitre { get; set; }
        public float? Total { get; set; }
    }
}
