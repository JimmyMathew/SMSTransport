using System;
using System.Collections.Generic;

namespace SMSTransport.Models
{
    public class Response
    {
        public bool IsSuccess { get; set; }
        public long ReturnId { get; set; }
        public string Message { get; set; }

    }
}
