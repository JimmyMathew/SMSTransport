﻿using System;
using System.Collections.Generic;

namespace SMSTransport.smstransport
{
    public partial class Miscexpenses
    {
        public long Id { get; set; }
        public string Date { get; set; }
        public string Vehicletype { get; set; }
        public string Vehicleno { get; set; }
        public float Pc { get; set; }
        public float Rdo { get; set; }
        public float Rto { get; set; }
        public float Total { get; set; }
    }
}
