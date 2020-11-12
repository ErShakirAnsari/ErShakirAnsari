
<#if package?? && package != "">
package ${package};
</#if>

import java.io.IOException;
import javax.servlet.ServletException;
<#if classAnnotation??>
import javax.servlet.annotation.WebServlet;
</#if>
<#if includeInitParams??>
import javax.servlet.annotation.WebInitParam;
</#if>
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author SKR
 */
<#if classAnnotation??>
${classAnnotation}
</#if>
public class ${name} extends javax.servlet.http.HttpServlet {

   private static final long serialVersionUID = 1L;

   private void _SKR(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      res.setContentType("text/html;charset=UTF-8");
      java.io.PrintWriter out = res.getWriter();
      try {
         /* TODO output your page here. You may use following sample code. */
         out.println("<html>"
               + "<head>"
               + "<title>SKR | ${name}</title>"
               + "</head>"
               + "<body>"
               + "<h1>Servlet ${name} at " + req.getContextPath () + "</h1>"
               + "</body>"
               + "</html>");
      } finally {
         out.close();
      }
   }

   //----
<#if java15style??>
   @Override
</#if>
   protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      _SKR(req, res);
   }
<#if java15style??>
   @Override
</#if>
   protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      _SKR(req, res);
   }
}