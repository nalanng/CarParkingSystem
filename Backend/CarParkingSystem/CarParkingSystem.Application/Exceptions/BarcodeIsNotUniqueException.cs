using System;
using System.Collections.Generic;
using System.Text;

namespace CarParkingSystem.Core.Exceptions
{
    public class BarcodeIsNotUniqueException : Exception
    {
        public BarcodeIsNotUniqueException(string message) : base(message)
        {
        }
    }
}
