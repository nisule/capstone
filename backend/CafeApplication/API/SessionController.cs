using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API {
    // have this SessionController thing so we have 1 SessionManager everything can access
    public class SessionController {
        public static SessionManager sm;

        static SessionController() {
            sm = new SessionManager();
        }
    }
}
