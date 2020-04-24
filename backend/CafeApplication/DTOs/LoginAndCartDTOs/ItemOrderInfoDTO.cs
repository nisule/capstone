using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs {
    public class ItemOrderInfoDTO {
        public string item_id { get; set; }
        public string item_name { get; set; }
        public string quantity { get; set; }
        public string price { get; set; }

    }
}
