using System;
using System.Collections.Generic;

namespace SMSTransport.smstransport
{
    public partial class Rtoexpenses
    {
        public long Id { get; set; }
        public string Date { get; set; }
        public string Vehicletype { get; set; }
        public string Vehicleno { get; set; }
        public float Tax { get; set; }
        public float Insurance { get; set; }
        public float Fc { get; set; }
        public float Total { get; set; }
    }
}
