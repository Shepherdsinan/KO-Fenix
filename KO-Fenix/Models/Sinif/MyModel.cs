using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KO_Fenix.Models.Sinif
{
    public class MyModel
    {
        public short Class { get; set; }
        public string IDName { get; set; }
        public byte Nation { get; set; }
        public byte Ranking { get; set; }
        public short? Members { get; set; }
        public string Chief { get; set; }
        public int Points { get; set; }

    }
}