
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
    public static final String vendorFolder = new File(pwd).getParent() + File.separator + "vendors";
    public static final String resoursesFolder = vendorFolder + File.separator + "_resourses";

    public static final String file = pwd + File.separator + "file.txt";
    public static final String indexFile = new File(pwd).getParent() + File.separator + "index.html";
    public static final String indexHead = pwd + File.separator + "head.txt";
    public static final String indexBodyEnd = pwd + File.separator + "bodyEnd.txt";
    public static final String encoding = "UTF-8";

    public static void main(String[] args) throws Exception
    {
        try (Writer writer = new BufferedWriter(new FileWriter(indexFile));)
        {
            writer.append(getHead());
            ArrayList<String> folderList = new ArrayList<>();
            folderList = getFolderList(vendorFolder, folderList);

            for (String folderName : folderList)
            {
                File folder = new File(folderName);
                writer.append(getCardDiv(folder));

            }
            writer.append(getAbout());
            writer.append(getBodyEnd());
        }
    }

    private static ArrayList getFolderList(String root, ArrayList<String> list)
    {
        for (File singleFile : new File(root).listFiles())
        {
            if (singleFile.isDirectory())
            {
                String absFolderPath = singleFile.getAbsolutePath();
                if (!absFolderPath.equalsIgnoreCase(resoursesFolder))
                {
                    list.add(absFolderPath);
                    //getFolderList(absFolderPath, list);
                }
            }
        }
        return list;
    }

    private static String getCardDiv(File folder)
    {
        StringBuilder builder = new StringBuilder();

        String folderName = folder.getName().toLowerCase();
        folderName = folderName.startsWith("1") ? folderName.replace("1", "") : folderName;

        builder.append("<div class='card mb-2'>");
        builder.append("<div class='card-header'> ").append(folderName).append(" </div>");
        builder.append("<div class='card-body' style='display: none'>");

        for (File singleFile : folder.listFiles())
        {
            if (singleFile.isFile())
            {
                builder.append("<label>");
                builder.append("<i class='fa fa-copy' title='copy'></i>&nbsp;<i class='fa fa-clipboard' title='copy as html'></i>&nbsp;|&nbsp;");
                builder.append("<code>");
                builder.append("https://ershakiransari.github.io/cdn");
                builder.append(singleFile.getAbsolutePath().replace(vendorFolder, "/vendors").replace("\\", "/"));
                builder.append("</code>");
                builder.append(MessageFormat.format("&nbsp; (size: {0} kb)", singleFile.length() / 1024));
                builder.append("</label>");
                //System.out.println(singleFile.getAbsolutePath());
            }
        }

        builder.append("</div>");
        builder.append("</div>");

        return builder.toString();
    }

    private static String getHead() throws Exception
    {
        StringBuilder builder = new StringBuilder();
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(indexHead));)
        {
            String line = null;
            while ((line = bufferedReader.readLine()) != null)
            {
                builder.append(line.trim());
            }
        }
        return builder.toString();
    }

    private static String getAbout() throws Exception
    {
        return "<hr>"
                + "<p class='text-right'>"
                + "&copy; SKR - " + (new Date().getYear() + 1900)
                + "<br>Updated on: " + new Date()
                + "</p>";
    }

    private static String getBodyEnd() throws Exception
    {
        StringBuilder builder = new StringBuilder();
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(indexBodyEnd));)
        {
            String line = null;
            while ((line = bufferedReader.readLine()) != null)
            {
                builder.append(line.trim());
            }
        }
        return builder.toString();
    }
}
