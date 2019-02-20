
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.Writer;
import java.io.FileReader;
import java.io.FileWriter;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Shakir Ansari
 */
public class IndexMaker
{
    public static final String pwd = System.getProperty("user.dir");
    public static final String indexFile = new File(pwd).getParent() + File.separator + "index.html";
    public static final String indexSourceFile = pwd + File.separator + "index.txt";
    public static final String encoding = "UTF-8";

    public static void main(String[] args) throws Exception
    {
        try (Writer writer = new BufferedWriter(new FileWriter(indexFile));
			BufferedReader bufferedReader = new BufferedReader(new FileReader(indexSourceFile));)
        {
            String line = null;
            while ((line = bufferedReader.readLine()) != null)
            {
                writer.append(line);
            }
        }
    }

}
