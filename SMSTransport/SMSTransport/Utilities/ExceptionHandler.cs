using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Diagnostics;
using SMSTransport.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SMSTransport.Utilities
{
    [Route("[controller]")]
    public class ExceptionHandler : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var result = new ObjectResult(new
            {
                ErrorCode = 500,
                ErrorHeading = "Please contact Administrator",
                ErrorMessage = context.Exception.Message,
                ErrorSource = context.ActionDescriptor.DisplayName
            });

            result.StatusCode = 500;
            context.Result = result;
        }

    }
}
