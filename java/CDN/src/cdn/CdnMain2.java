
package cdn;

import cdn.utils.Constants;
import cdn.utils.AppUtilities;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.Writer;
import java.io.File;
import java.util.ArrayList;

/**
 *
 * @author Shakir Ansari
 */
public class CdnMain2
{
    public static void main(String[] args) throws Exception
    {
        try (Writer writer = new BufferedWriter(new FileWriter(Constants.indexFile));)
        {
            writer.append(AppUtilities.getLogo());
            writer.append(AppUtilities.getHead(2));

            writer.append("<script>");
            writer.append("var files=[" + getFileLists() + "];");
            writer.append("</script>");

            writer.append(AppUtilities.getAbout(2));
            writer.append(AppUtilities.getBodyEnd(2));
            System.out.println("****************** DONE ******************");
            System.out.println(Constants.indexFile);
        }
    }

    private static String getFileLists()
    {
        ArrayList<String> list = new ArrayList<>();
        list = walker(list, Constants.cdnRootFolder);

        String response = "";
        for (String str : list)
        {
            response += "'" + str.replace("\\", "/") + "',";
        }

        return response.substring(0, response.length() - 1);
    }

    private static ArrayList walker(ArrayList list, String root)
    {
        File[] fileList = new File(root).listFiles();

        for (File file : fileList)
        {
            if (file.getName().startsWith("@"))
            {
                continue;
            }

            if (file.isDirectory())
            {
                walker(list, file.getAbsolutePath());
            } else
            {
                list.add(file.getAbsolutePath().replace(Constants.cdnRootFolder + File.separator, ""));
            }
        }
        return list;
    }
}
