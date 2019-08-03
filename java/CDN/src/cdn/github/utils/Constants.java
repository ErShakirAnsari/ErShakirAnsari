
package cdn.github.utils;

import java.io.File;

/**
 *
 * @author SKR
 */
public class Constants
{
    public static final String slash = File.separator;
    public static final String pwd = System.getProperty("user.dir");
    public static final String rootFolder = new File(pwd).getParentFile().getParentFile().getAbsolutePath();
    public static final String cdnRootFolder = rootFolder + slash + "cdn";
    public static final String resourcesFolder = pwd + "\\src\\cdn\\resources\\";

    // resources
    public static final String indexFile = new File(cdnRootFolder) + slash + "index.html";
    public static final String indexHead = "head.html";
    public static final String indexLogo = "logo.html";
    public static final String indexBodyEnd = "bodyEnd.html";
    public static final String encoding = "UTF-8";

    public static String MODE = "";
    public static final String MODE_DEV = "dev";
    public static final String MODE_PROD = "prod";
}
