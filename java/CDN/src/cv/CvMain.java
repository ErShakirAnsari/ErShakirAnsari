
package cv;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Writer;

/**
 *
 * @author Shakir Ansari
 */
public class CvMain
{
    public static final String slash = File.separator;
    public static final String pwd = System.getProperty("user.dir");
    public static final String indexFile = new File(pwd).getParentFile().getParent() + slash + "cv" + slash + "index.html";
    public static final String resourcesFolder = pwd + slash + "src" + slash + "cv" + slash + "resources" + slash;
    public static final String indexSourceFile = resourcesFolder + "source.html";

    public static void main(String[] args) throws Exception
    {
        System.out.println("pwd: " + pwd);
        System.out.println("indexFile: " + indexFile);
        System.out.println("indexSourceFile: " + indexSourceFile);

        try (Writer writer = new BufferedWriter(new FileWriter(indexFile));
             BufferedReader bufferedReader = new BufferedReader(new FileReader(indexSourceFile));)
        {
            String line = null;
            while ((line = bufferedReader.readLine()) != null)
            {
                writer.append(line.trim());
            }
        }
    }
}
