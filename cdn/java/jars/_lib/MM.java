
import java.awt.MouseInfo;
import java.awt.Robot;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author SKR
 */
public class MM {

   public static final int DELAY = 1000 *1;

   public static void main(String... args) throws Exception {
      Robot robot = new Robot();
      //Random random = new Random();

      for (int i = 1; true; i++) {

         int x = MouseInfo.getPointerInfo().getLocation().x;
         int y = MouseInfo.getPointerInfo().getLocation().y;

         Date dNow = new Date();
         SimpleDateFormat ft = new SimpleDateFormat("hh:mm:ss");

         System.out.println("[" + ft.format(dNow) + "] - Moved: " + i + " - [" + x + "," + y + "]");
         robot.mouseMove(0, 0);
         robot.mouseMove(x, y);
         Thread.sleep(DELAY);
      }
   }

}
