//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KO_Fenix.Models.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class AUTONOTICE
    {
        public int Id { get; set; }
        public string Notice { get; set; }
        public byte bMinute { get; set; }
        public byte bHour { get; set; }
        public byte bDay { get; set; }
        public byte isActive { get; set; }
        public byte bType { get; set; }
    }
}